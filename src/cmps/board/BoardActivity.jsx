import { BackBtnSvg } from "../svg/ImgSvg";
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru.json'
import LastSeen from "./LastSeen";
import { MemberImg } from "../common/MemberImg";

export function BoardActivity({ board, onOpenMenuCmp }) {

    TimeAgo.addLocale(ru)

    const guest = { email: 'guest@trilili.com', fullname: 'Guest', imgUrl: '#c76ebe' }

    function StringToReactElement({ htmlString }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: htmlString }} />
        )
    }
    return (
        <section className="board-activity scroll">

            {board.activities.map(
                activity => (

                    <div className="activity-container flex" key={activity.id}>
                        {(activity.byMember)
                            ? <div className="user-igm">
                                <MemberImg member={activity.byMember} size={32} />
                            </div> :
                            <div className="user-igm initials"style={{ 'background': guest.imgUrl }}>
                                <span >G</span>
                            </div>
                        }
                        <div>
                            <div className="activity-content align-center">
                                <span className="user-name">{activity.byMember ? activity.byMember.fullname : guest.fullname}</span>
                                <StringToReactElement htmlString={activity.txt} />
                            </div>
                            <LastSeen date={activity.createdAt} />
                        </div>

                    </div >
                ))
            }

            <div className="back-btn flex align-center justify-center" onClick={(ev) => onOpenMenuCmp(ev, 'Menu')}>
                <BackBtnSvg />
            </div>
        </section >
    )
}