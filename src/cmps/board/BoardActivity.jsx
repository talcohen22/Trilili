import { useSelector } from "react-redux";
import { BackBtnSvg } from "../svg/ImgSvg";
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru.json'
import LastSeen from "./LastSeen";

export function BoardActivity({ board, onOpenMenuCmp }) {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    console.log(boards);
    TimeAgo.addLocale(ru)

    const guest = { email: 'guest@trilili.com', fullname: 'Guest', imgUrl: '#c76ebe' }

    function getInitials(fullName) {
        if (typeof fullName !== 'string') {
            return '';
        }

        const nameParts = fullName.split(' ').filter(part => part); // Filter out empty parts
        const initials = nameParts.map(part => part[0]).slice(0, 2).join('').toUpperCase(); // Get the first letter of each part, then join the first two

        return initials;
    }

    function StringToReactElement({ htmlString }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: htmlString }} />
        )
    }

    return (
        <section className="board-activity">

            {board.activities.map(activity => (
                <div className="activity-container flex" key={activity.id}>
                    <div className="user-igm flex justify-center align-center"
                        style={{
                            background: activity.byMember && activity.byMember.imgUrl.charAt(0) === '#' ? activity.byMember.imgUrl : activity.byMember ? `url(${activity.byMember.imgUrl})` : guest.imgUrl,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                        }}>
                        {activity.byMember && activity.byMember.imgUrl.charAt(0) === '#' ? getInitials(activity.byMember.fullname) : activity.byMember ? '' : 'G'}
                    </div>
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