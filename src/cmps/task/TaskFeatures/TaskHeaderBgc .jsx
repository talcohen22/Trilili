// export function TaskHeaderBgc({ bgHeaderClr }) {

//     console.log('bgHeaderClr', bgHeaderClr.backgroundColor)
//     const divStyle = {
//         background: bgHeaderClr.backgroundColor.startsWith('#')
//             ? bgHeaderClr.backgroundColor
//             : '',

//         backgroundSize: 'cover',
//     }

//     console.log(divStyle);

//     if (!divStyle.background) return <div></div>
//     return (
//         <div className="bg-task-header-clr" style={divStyle}>
//             {!bgHeaderClr.backgroundColor.startsWith('#') ? (
//                 <img src={bgHeaderClr.backgroundColor} alt="Image" />
//             ) : null}
//         </div>
//     )
// }

export function TaskHeaderBgc({ bgHeaderClr }) {

    console.log('bgHeaderClr.backgroundColor', bgHeaderClr.backgroundColor)
    const style = {
        // background: bgHeaderClr.backgroundColor ? bgHeaderClr.backgroundColor : `url(${bgHeaderClr.backgroundColor})`,
        background: bgHeaderClr.backgroundColor ? bgHeaderClr.backgroundColor : ` url(${bgHeaderClr.backgroundColor})`
    }
    console.log('style', style)
    return <div className="bg-task-header-clr" style={style}></div>;
}
