import Sound from 'react-native-sound';
//import RNAudioStreamer from 'react-native-audio-streamer';
import { DeviceEventEmitter, Alert} from 'react-native';
//import MusicControl from 'react-native-music-control';

class AudioController {
	// Inicializa atributos
	constructor() {
		this.paused = true;
		this.playlist = [];

		/**
		 * key*, title*, url*, author, thumbnail, path, currentTime, duration
		 */
		this.currentAudio = {};
		this.type = 'streaming';

		// Instance of Sound
		this.player = null;

		// Current audio index
		this.currentIndex = 0;

		// Callbacks
		this.currentAudioListener = () => null;
		this.currentTimeListener = () => null;

		this.onChangeStatus = () => null;
		this.onChangeCurrentTime = () => null;

		// Status of audio
		this.status = {
			PLAYING: 'PLAYING',
			LOADING: 'LOADING',
			LOADED: 'LOADED',
			PAUSED: 'PAUSED',
			STOPPED: 'STOPPED',
			SEEKING: 'SEEKING',
			ERROR: 'ERROR'
		};
	}

	/**
	 * Load playlist, start track, and callback arrow
	 * to change audio state and current audio time
	 * 
	 * @param {array} playlist
	 * @param {int} track index
	 * @param {function} onChangeStatus
	 * @param {function} onChangeCurrentTime
	 */
	init(playlist, trackIndex = 0, onChangeStatus, onChangeCurrentTime) {
		this.playlist = playlist;

		// Current audio arrow as the track the user has passed
		this.currentAudio = playlist[trackIndex];
		this.currentIndex = trackIndex;

		// Arrow state change listeners and current sound time change
		this.onChangeStatus = onChangeStatus;
		this.onChangeCurrentTime = onChangeCurrentTime;

		this.onChangeStatus(this.status.LOADING);

		// Load the audio firstly
		this.load(this.currentAudio, (isLoaded) => isLoaded ?
			this.onChangeStatus(this.status.LOADED) : this.onChangeStatus(this.status.ERROR));

		// Adds listener to monitor the state of the audio streaming player
		this.subscription = DeviceEventEmitter
			.addListener('RNAudioStreamerStatusChanged', this.onStatusChanged.bind(this));
	}

	onStatusChanged(status) {
		if (status === 'PAUSED' || status === 'PLAYING') {
			// Updates the duration of audio streaming after status change
			this.getDuration(seconds => {
				this.currentAudio.duration = seconds;
			});
			this.onChangeStatus(this.status.LOADED);
		}
	}

	/**
	 * Loads audio and executes a callback saying whether it was loaded or not
	 *
	 * @param {*Object} audio
	 * @param {*Function} isLoaded
	 */
	load(audio, isLoaded) {
		this.musicControlReset();
		this.currentAudio = audio;
		// Check if audio file has already been downloaded to set player
		if (this.currentAudio.path) {
			// Audio offline, this.player will be instance of Sound
			this.type = 'offline';

			Sound.setCategory('Playback');
			this.player = new Sound(this.currentAudio.path,
				Sound.MAIN_BUNDLE,
				(error) => {
					if (error) return;

					// Run callback if it exists
					if (isLoaded) isLoaded(() => this.player.isLoaded());

					// Updates the audio length
					this.getDuration(seconds => {
						this.currentAudio.duration = seconds;
					});
				}
			);
		} else {
			// Audio online, this.player will be instance of RNAudioStreamer
			this.type = 'streaming';
			//this.player = RNAudioStreamer;
            // this.player.setUrl(this.currentAudio.url);
            this.player = new Sound(this.currentAudio.url,
                Sound.MAIN_BUNDLE,
                (error) => {
                    if (error) return;

                    // Run callback if it exists
                    if (isLoaded) isLoaded(() => this.player.isLoaded());

                    // Updates the audio length
                    this.getDuration(seconds => {
                        this.currentAudio.duration = seconds;
                    });
                }
            );

			// Run callback if it exists
			if (isLoaded) isLoaded(true);
		}

		// Start a audio control
		this.startMusicControl();
	}

	//------------ Basic functions of the player ------------//

	playerIsNull() {
		if (this.player == null) {
			this.onChangeStatus(this.status.ERROR);
			return true;
		}
		return false;
	}

	play() {
		if (this.playerIsNull()) return;

		// Play in streaming or local audio
		if (this.type === 'streaming') {
			this.player.play();
		} else {
			this.player.play(this.onAudioFinish.bind(this));
		}

		// Start a function that performs current sound time callback
		this.onAudioProgressTime(this.player, this.onChangeStatus, this.status);

		// Set up Player and Music Control to start where the user left off
		if (typeof this.currentAudio.currentTime !== 'undefined' &&
			this.currentAudio.currentTime >= 0) {
			this.seek(this.currentAudio.currentTime);
		}

		this.paused = false;
		this.onChangeStatus(this.status.PLAYING);
		this.musicControlPlay();
	}

	pause() {
		if (this.playerIsNull()) return;

		this.player.pause();

		// Saves the current audio time
		this.currentAudio.currentTime = parseInt(this.currentAudio.currentTime, 10);

		// To or listener of current time
		this.clearCurrentTimeListener();
		this.paused = true;
		this.onChangeStatus(this.status.PAUSED);
		this.musicControlPause();
	}

	seek(seconds) {
		if (this.playerIsNull()) return;
		// If he gave seek to end of the audio, for him and puts current time 0
		if (parseInt(seconds, 10) >= parseInt(this.currentAudio.duration, 10)) {
			this.clearCurrentTimeListener();
			this.player.pause();
			this.paused = true;
			this.musicControlPause();
			this.currentAudio.currentTime = 0;
			this.onChangeStatus(this.status.STOPPED);
			return;
		}

		// Here a call must be implemented for the seek function, independent of the library
		if (this.type === 'streaming') {
			//this.player.seekToTime(seconds);
            this.player.setCurrentTime(seconds);
		} else {
			this.player.setCurrentTime(seconds);
		}
		const newCurrentTime = (seconds >= 0) ? seconds : 0;

		this.onChangeCurrentTime(newCurrentTime);

		// Updates current time
		this.currentAudio.currentTime = newCurrentTime;
		this.currentAudioListener(seconds);
		this.musicControlSeek(seconds);
		this.musicControlRefresh();
	}

	seekToForward(seconds) {
		if (this.playerIsNull()) return;

		// Checks if forward arrived at the end of the audio
		if (this.currentAudio.currentTime + seconds >= parseInt(this.currentAudio.duration, 10)) return;

		this.seek(this.currentAudio.currentTime + seconds);
	}

	hasTrack(index) {
		return this.playlist[index] !== undefined;
	}

	hasNext() {
		return this.playlist[this.currentIndex + 1] !== undefined;
	}

	hasPrevious() {
		return this.playlist[this.currentIndex - 1] !== undefined;
	}

	playNext() {
		this.playAnotherTrack(this.currentIndex + 1);
	}

	playPrevious() {
		this.playAnotherTrack(this.currentIndex - 1);
	}

	playAnotherTrack(index) {
		if (!this.hasTrack(index)) {
			return; // The next index should be a valid index in the playlist
			// throw 'Playlist must contain index of next audio'
		}
		this.currentIndex = index;
		this.pause();
		this.selectedAudio = this.playlist[this.currentIndex];
		this.load(this.selectedAudio, (isLoaded) => {
			this.play();
			if (isLoaded) {
				if (this.type !== 'streaming') this.onChangeStatus(this.status.LOADED);
			} else return null;
		});
	}

	//------------ Callbacks ------------//

	// Initializes the current time listener
	onAudioProgressTime(player, onChangeStatus, status) {
		// Updating currentTime in audioProps
		this.currentTimeListener = setInterval(() => {
			this.getCurrentTime((seconds, isPlaying) => {
				if (this.currentAudio.duration > 0 && seconds >= this.currentAudio.duration) {
                    Alert.alert('End......')
					player.pause();
					onChangeStatus(status.STOPPED);
					this.currentAudio.currentTime = 0;
					this.clearCurrentTimeListener();
				} else {
					this.currentAudio.currentTime = seconds;
					this.onChangeCurrentTime(seconds);
					if (isPlaying && seconds + 1 > this.currentAudio.duration) {
                        setTimeout(function(){
                            onChangeStatus(status.STOPPED);
                        }, 1000);
                    }
				}
			});
		}, 1000);
	}

	// Start the current time listener
	startCurrentTimeListener() {
		this.onAudioProgressTime();
	}

	// For current time listener
	clearCurrentTimeListener() {
		clearInterval(this.currentTimeListener);
	}

	// Returns current audio time
	getCurrentTime(callback) {
		if (this.playerIsNull()) return;

        this.player.getCurrentTime(callback);

		// if (this.type === 'streaming') {
		// 	this.player.currentTime((err, seconds) => {
		// 		if (!err) callback(seconds);
		// 	});
		// } else {
		// 	this.player.getCurrentTime(callback);
		// }
	}

	setCurrentTime(seconds) {
		const secondsRound = parseInt(seconds, 10);
		if (this.type === 'streaming') this.player.seekToTime(secondsRound);
		else this.player.setCurrentTime(secondsRound);
		this.pause();
		this.play();
	}

	getDuration(callback) {
		if (this.playerIsNull()) return;
        if (this.player.getDuration() > 0) {
            callback(this.player.getDuration());
        }
		// if (this.type === 'streaming') {
		// 	this.player.duration((err, seconds) => {
		// 		if (!err && seconds > 0) callback(seconds);
		// 		else callback(-1);
		// 	});
		// } else if (this.player.getDuration() > 0) {
		// 	callback(this.player.getDuration());
		// }
	}

	onAudioFinish() {
		this.musicControlReset();
		clearInterval(this.currentTimeListener);
	}

    setVolume(volume) {
        if (this.playerIsNull()) return;
        this.player.setVolume(volume);
    }

    setNumberOfLoops(value) {
        if (this.playerIsNull()) return;
        this.player.setNumberOfLoops(value);
    }

	//------------Change Music Control States------------//

	musicControlsEnableControls() {
		// MusicControl.enableControl('skipBackward', true, { interval: 30 });
		// MusicControl.enableControl('skipForward', true, { interval: 30 });
		// MusicControl.enableControl('play', true);
		// MusicControl.enableControl('pause', true);
	}

	startMusicControl() {
		this.initializeMusicControlEvents();
		//MusicControl.setNowPlaying({
		//	title: this.currentAudio.title, //OK
		//	artwork: this.currentAudio.thumbnailUri ? this.currentAudio.thumbnailUri : this.currentAudio.thumbnailLocal, //OK
		//	artist: this.currentAudio.author, //OK
		//	album: this.currentAudio.author ? this.currentAudio.author : ''
		//});
		//this.musicControlsEnableControls();
	}

	musicControlPause() {
		// this.getCurrentTime((elapsedTime) => {
		// 	MusicControl.updatePlayback({
		// 		state: MusicControl.STATE_PAUSED,
		// 		elapsedTime
		// 	});
		// });
	}

	musicControlPlay() {
		// this.getCurrentTime((elapsedTime) => {
		// 	MusicControl.updatePlayback({
		// 		state: MusicControl.STATE_PLAYING,
		// 		elapsedTime
		// 	});
		// });
	}

	musicControlRefresh() {
		// this.getDuration((duration) => {
		// 	this.getCurrentTime((elaspsedTime) => {
		// 		MusicControl.updatePlayback({
		// 			elaspsedTime,
		// 			duration,
		// 		});
		// 	});
		// });
	}

	musicControlSeek(elaspsedTime) {
		// this.getDuration((duration) => {
		// 	MusicControl.updatePlayback({
		// 		elaspsedTime,
		// 		duration
		// 	});
		// });
	}

	musicControlReset() {
		// MusicControl.resetNowPlaying();
	}

	initializeMusicControlEvents() {
		// MusicControl.on('pause', () => {
		// 	this.pause();
		// 	this.musicControlPause();
		// });
		// MusicControl.on('play', () => {
		// 	this.play();
		// 	this.musicControlPlay();
		// });
		// MusicControl.on('skipForward', () => {
		// 	this.skip(30);
		// }); // iOS only
		// MusicControl.on('skipBackward', () => {
		// 	this.skip(-30);
		// }); // iOS only
	}
}

export default new AudioController();
