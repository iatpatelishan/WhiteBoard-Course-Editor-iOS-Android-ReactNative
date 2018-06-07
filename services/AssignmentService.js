let _singleton;
const ASSIGNMENT_API_URL = 'http://cs5610-summer1-2018-patel.herokuapp.com/api/assignment/AID';

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
            .catch(() => {
                return []
            })
    }


    updateAssignment(assignmentId, assignment) {
        return fetch(ASSIGNMENT_API_URL.replace('AID', assignmentId), {
            method: 'PUT',
            body: JSON.stringify(assignment),
            headers: {
                'content-type': 'application/json'
            }
        });
    }


}

export default AssignmentService;