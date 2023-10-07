import { BackBtnSvg, ExitBtnSvg } from "../svg/ImgSvg"


export function EditLabel({setDynamicParams}) {
    const colors = ['#f8cece', '#f9a7a7', '#f94d4d', '#acf4ca', '#65b787', '#1a6e3d', '#698fcc', '#3e67a9', '#194284', '#e89862', '#a65621', '#c380d2', '#7e328f']
    return (
        <section className="edit-label">
            <div className="display-chosen-label flex justify-center align-center">
                <div className="chosen-color"
                    style={{ backgroundColor: '#f8cece' }}></div>
            </div>
            <h3>Title</h3>
            <input className="add-lable" type="text" />
            <h3>Select a color</h3>
            <ul className="colors-container flex ">
                {colors.map((color, idx) => (
                    <li className="color-container"
                        key={idx}
                        style={{ backgroundColor: color }}>
                    </li>
                ))}
            </ul>
            <div className="remove-color-btn flex">
                <ExitBtnSvg />
                <p className="create-new-label">Remove Color</p>
            </div>
            <hr />
            <div className="save-delete-btns flex justify-space-b">
                <button>Save</button>
                <button>Delete</button>
            </div>
            <div className="back-btn" onClick={() => setDynamicParams({type: 'Labels'})}>
                <BackBtnSvg />
            </div>

        </section>
    )
}