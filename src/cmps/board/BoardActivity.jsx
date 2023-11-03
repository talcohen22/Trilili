import { useSelector } from "react-redux";
import { BackBtnSvg } from "../svg/ImgSvg";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import LastSeen from "./LastSeen";
import { MemberImg } from "../common/MemberImg";


export function BoardActivity({ board, onOpenMenuCmp }) {

    TimeAgo.addDefaultLocale(en)
    TimeAgo.addLocale(ru)
    const guest = { email: 'guest@trilili.com', fullname: 'Guest', imgUrl: '#c76ebe' }

    function StringToReactElement({ htmlString }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: htmlString }} />
        )
    }
    return (
        <section className="board-activity">

            {board.activities.map(
                activity => (
                    
                <div className="activity-container flex" key={activity.id}>
                  {(activity)&&<div className="user-igm"><MemberImg member={activity.byMember}/></div>}
                    <div>
                        <div className="activity-content align-center">
                            <span className="user-name">{activity.byMember ? activity.byMember.fullname : guest.fullname}</span>
                            <StringToReactElement htmlString={activity.txt} />
                        </div>
                        <LastSeen date={activity.createdAt} />
                    </div>

                </div>
            ))
            }

            <div className="back-btn flex align-center justify-center" onClick={(ev) => onOpenMenuCmp(ev, 'Menu')}>
                <BackBtnSvg />
            </div>
        </section >
    )
}