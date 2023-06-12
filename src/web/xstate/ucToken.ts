import { createMachine, send, assign, interpret } from 'xstate';

const states = {
    wait: {},
    update: {},
    updateSuccess: {},
    updateError: {},
    logout: {}
}
const createUcTokenMachine = (token: string) => {
    return createMachine({
        id: 'ucToken',
        initial: 'wait',
        context: {
            token
        },
        states
    })
}