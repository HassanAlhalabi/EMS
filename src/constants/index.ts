
export const USERS_TYPES = {
    employee: 'Employee',
    doctor: 'Doctor',
    student: 'Student',
}

export const PAGINATION_INFO = {
    "pageSize": 15,
    "pageNo": 1,
    "totalItems": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
}

export const ACTION_TYPES = {
    add:    'ADD',
    update: 'UPDATE',
    delete: 'DELETE',
    toggle: 'TOGGLE'
}

export const WORK_DAYS: Record<string,number> = {
    'Sunday': 1,
    'Monday': 2,
    'Tuesday': 3,
    'Wednesday': 4,
    'Thursday': 5,
    'Friday': 6,
    'Saturday': 7
}; 

export const WORK_DAYS_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']