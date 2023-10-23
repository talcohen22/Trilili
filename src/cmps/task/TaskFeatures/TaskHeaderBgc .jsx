export function TaskHeaderBgc({ bgHeaderClr }) {
    const style = {
        background: bgHeaderClr.backgroundColor.startsWith('#') ? bgHeaderClr.backgroundColor : '',
        backgroundSize: 'cover',
    }

    return (
        <>

            {bgHeaderClr.backgroundColor.startsWith('#') &&
                <div className="bg-task-header-clr" style={style}></div>}

            {bgHeaderClr.cover &&
                <img className="cover-task-header" src={bgHeaderClr.cover} alt="" />
            }


            {/* {bgHeaderClr.backgroundColor.startsWith('#') ? (
                <div className="bg-task-header-clr" style={style}></div>
            ) : (
                <img className="cover-task-header" src={bgHeaderClr.cover} alt="" />
            )} */}
        </>
    )
}
