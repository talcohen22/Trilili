import { MemberImg } from "../common/MemberImg";


export function MembersFilter({ board, filterBy, onSetFilterBy }) {

    return (
        <section className="members-filter">
            <h2>Members</h2>

            {board.members.map(member =>
                <div className="member flex align-center" key={member._id}>
                    <input className="member-checkbox"
                        type="checkbox"
                        // checked={todo.isDone}
                        onChange={(ev) => onSetFilterBy(ev, 'members', member._id)}
                    />
                    <MemberImg member={member} size={24} />
                    <p>{member.fullname}</p>

                </div>
            )}
        </section>
    )
}