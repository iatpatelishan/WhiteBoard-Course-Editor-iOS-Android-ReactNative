let _singleton;
const EXAM_API_URL = 'http://192.168.0.13:8080/api/exam/EID/question';
const EXAM_ESSAY_API_URL = 'http://192.168.0.13:8080/api/exam/EID/essay';
const EXAM_CHOICE_API_URL = 'http://192.168.0.13:8080/api/exam/EID/choice';
const EXAM_BLANKS_API_URL = 'http://192.168.0.13:8080/api/exam/EID/blanks';
const EXAM_TRUEFALSE_API_URL = 'http://192.168.0.13:8080/api/exam/EID/truefalse';

class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton];
    }

    findAllQuestionsForExam(examId) {
        return fetch(EXAM_API_URL.replace('EID', examId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return []})
    }

    createQuestion(examId, questionType){
        let newWidget = {'id':'99999','name':'New '+questionType, 'questionType':questionType};
        let apiUrl;
        if(questionType=='Essay'){
            apiUrl=EXAM_ESSAY_API_URL;
        }
        if(questionType=='Blanks'){
            apiUrl=EXAM_CHOICE_API_URL;
        }
        if(questionType=='Choice'){
            apiUrl=EXAM_BLANKS_API_URL;
        }
        if(questionType=='TrueFalse'){
            apiUrl=EXAM_TRUEFALSE_API_URL;
        }
        return fetch(apiUrl.replace('EID', examId), {
            method: 'post',
            body: JSON.stringify(newWidget),
            headers: {
                'content-type': 'application/json'}
        });
    }

}

export default ExamService;