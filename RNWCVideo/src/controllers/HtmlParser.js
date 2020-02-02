import Log from '../common/Log';

import DOMParser from 'react-native-html-parser';

var tag = 'HtmlParser: '
export default class HtmlParser {
    static parseToLinks(html) {
        var links = []
        let parser = new DOMParser.DOMParser()
        let doc = parser.parseFromString(html, 'text/html')
        let list_news_media = doc.getElementsByTagName('article')
        for (var i = 0; i<list_news_media.length; i++) {
            let article = list_news_media[i]
            let aTag = article.getElementsByTagName('a')
            if (aTag.length > 0) {
                link = aTag[0].getAttributeNode('href')
                title = aTag[0].getAttributeNode('title')
                links.push({'id': i, 'link': link.value, 'title': title.value})
            }
        }
        return links
    }
 
}