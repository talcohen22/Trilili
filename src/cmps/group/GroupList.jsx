import { GroupPreview } from "./GroupPreview";

export function GroupList({ board }) {
    const { groups } = board
    console.log(groups)

    return (
        <section >
            <ul className='groups-list'>
                {groups.map((group) => (
                    <li key={group.id}>
                        <GroupPreview group={group} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
