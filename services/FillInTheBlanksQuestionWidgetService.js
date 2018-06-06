let _singleton;
const BLANKS_QUESTION_WIDGET_API_URL = 'http://192.168.43.172:8080/api/question/choice/QID';

class FillInTheBlanksQuestionWidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInTheBlanksQuestionWidgetService(_singleton);
        return this[_singleton];
    }

    findQuestionById(questionId) {
        return fetch(BLANKS_QUESTION_WIDGET_API_URL.replace('QID', questionId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {
                return []
            })
    }


    updateQuestion(questionId, question) {
        return fetch(BLANKS_QUESTION_WIDGET_API_URL.replace('QID', questionId), {
            method: 'PUT',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

}

export default FillInTheBlanksQuestionWidgetService;