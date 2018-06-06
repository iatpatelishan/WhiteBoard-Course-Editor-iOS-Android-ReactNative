let _singleton;
const TRUEFALSE_QUESTION_WIDGET_API_URL = 'http://192.168.43.172:8080/api/question/truefalse/QID';

class TrueOrFalseQuestionWidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueOrFalseQuestionWidgetService(_singleton);
        return this[_singleton];
    }

    findQuestionById(questionId) {
        return fetch(TRUEFALSE_QUESTION_WIDGET_API_URL.replace('QID', questionId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {
                return []
            })
    }


    updateQuestion(questionId, question) {
        return fetch(TRUEFALSE_QUESTION_WIDGET_API_URL.replace('QID', questionId), {
            method: 'PUT',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

}

export default TrueOrFalseQuestionWidgetService;