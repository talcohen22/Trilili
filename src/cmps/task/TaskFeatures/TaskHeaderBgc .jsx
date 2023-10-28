export function TaskHeaderBgc({ bgHeaderClr }) {
    
    const style = {
        background: bgHeaderClr.backgroundColor.startsWith('#') ? bgHeaderClr.backgroundColor : '',
        backgroundSize: 'cover',
    }

    return (
        <section>
            {bgHeaderClr.backgroundColor.startsWith('#') &&
                <div className="bg-task-header-clr" style={style}></div>}

            {bgHeaderClr.cover &&
                <img className="cover-task-header" src={bgHeaderClr.cover} alt="" />
            }
        </section>
    )
}
