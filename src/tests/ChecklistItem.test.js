import { validate } from '../components/ChecklistItem';


const example01 = {
    id: "1",
    description: "something",
    status: true,
    comments: ""
}

test('validate', () => {
    expect(validate()).toBe("");
})