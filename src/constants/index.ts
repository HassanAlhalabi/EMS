
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
    add:            'ADD',
    formDataAdd:    'FORM_DATA_ADD',
    update:         'UPDATE',
    bulkUpdate:     'BULK_UPDATE',
    formDataUpdate: 'FORM_DATA_UPDATE',
    delete:         'DELETE',
    bulkDelete:     'BULK_DELETE',
    toggle:         'TOGGLE',
    view:           'VIEW'
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

export const WORK_DAYS_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export const TASK_STATUS = {
    pending: 'PENDING',
    replied: 'REPLIED',
    closed: 'CLOSED' 
} 