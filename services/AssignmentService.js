let _singleton;
const ASSIGNMENT_API_URL = 'http://192.168.0.13:8080/api/assignment/AID';


class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton];
    }

    findAssignmentById(assignmentId) {
        return fetch(ASSIGNMENT_API_URL.replace('AID', assignmentId))
            .then(function (response) {
                return response.json();
            })
            .catch(() => {return []})
    }

}

export default AssignmentService;