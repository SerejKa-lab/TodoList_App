import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        let subject = [
            { title: "HTML", isDone: true },
            { title: 'CSS', isDone: true },
            { title: 'JS', isDone: true },
            { title: 'React', isDone: false }
        ];

        let subjectElements = subject.map((subj) => {
            return <TodoListTask title={subj.title} isDone={subj.isDone} />

        });

        // let subjectElementsFalse = [
        //     <TodoListTask title={subject[0].title} isDone={subject[0].isDone} />,
        //     <TodoListTask title={subject[1].title} isDone={subject[1].isDone} />,
        //     <TodoListTask title={subject[2].title} isDone={subject[2].isDone} />,
        //     <TodoListTask title={subject[3].title} isDone={subject[3].isDone} />
        // ];

        return (
            <div className='todoList-Tasks'>
                {subjectElements}
            </div>
        );
    }
}

export default TodoListTasks;

