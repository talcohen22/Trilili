import { AddGroupBtn } from "./AddGroupBtn";
import { GroupPreview } from "./GroupPreview";

export function GroupList({ board, onAddNewGroup }) {
    const { groups } = board
    console.log(groups)

    return (
        <section className='groups-list'>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        <GroupPreview group={group} />
                    </li>
                ))}
            </ul>
            <AddGroupBtn onAddNewGroup={onAddNewGroup} />
        </section>
    )
}
