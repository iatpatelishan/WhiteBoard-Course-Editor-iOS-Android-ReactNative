let _singleton;
const TOPIC_WIDGET_API_URL = 'http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/TID/widget';
const TOPIC_WIDGET_SAVE_API_URL = 'http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/TID/savewidget';
const TOPIC_ASSIGNMENT_WIDGET_CREATE_API_URL = 'http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/TID/assignment';
const TOPIC_EXAM_WIDGET_CREATE_API_URL = 'http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/TID/exam';
const WIDGET_DELETE_API_URL = 'http://cs5610-summer1-2018-patel.herokuapp.com/api/widget/WID';


class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton];
    }

    findAllWidgetsForTopic(topicId) {
        return fetch(TOPIC_WIDGET_API_URL.replace('TID', topicId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return []})
    }

    createWidget(topicId, widgetType){
        let newWidget = {'id':'99999','name':'New Widget', 'text':'Widget','widgetType':widgetType,'points':0}
        let apiUrl;
        if(widgetType=='Assignment'){
            apiUrl=TOPIC_ASSIGNMENT_WIDGET_CREATE_API_URL;
        }
        if(widgetType=='Exam'){
            apiUrl=TOPIC_EXAM_WIDGET_CREATE_API_URL;
        }
        return fetch(apiUrl.replace('TID', topicId), {
            method: 'post',
            body: JSON.stringify(newWidget),
            headers: {
                'content-type': 'application/json'}
        });
    }

    deleteWidget(widgetId){
        return fetch(WIDGET_DELETE_API_URL.replace('WID', widgetId), {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'}
        });
    }

}

export default WidgetService;