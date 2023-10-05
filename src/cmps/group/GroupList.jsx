import { AddGroupBtn } from "./AddGroupBtn";
import { GroupPreview } from "./GroupPreview";

export function GroupList({ board, onAddNewGroup, onAddTask }) {
    const { groups } = board
    console.log(groups)

    return (
        <section className='groups-list'>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        <GroupPreview group={group} board={board} onAddTask={onAddTask} />
                    </li>
                ))}
            </ul>
            <AddGroupBtn onAddNewGroup={onAddNewGroup} />
        </section>
    )
}
