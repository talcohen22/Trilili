export function DoneTasksCounter({ checklists }) {

    if (checklists.length === 0) return

    const { totalTodos, completedTodos } = checklists.reduce(
        (counts, checklist) => {
            checklist.todos.forEach((todo) => {
                counts.totalTodos++;
                if (todo.isDone) {
                    counts.completedTodos++;
                }
            });
            return counts;
        },
        { totalTodos: 0, completedTodos: 0 }
    );

    const totalCalc = `${completedTodos}/${totalTodos || 1}`;

    return (
        <div className="task-checklists-calc flex align-center">
            <p className="fs12" >{totalCalc}</p>
        </div>
    );
}
