import { NewBoardSvg } from "../svg/ImgSvg"

export function NewBoardModal() {
    console.log("aaa");
    return (
        <section className="new-board-modal">
            <div>
                <h1>Create board</h1>
                <div className="chosen-bgc">
                    <NewBoardSvg />
                </div>
            </div>
            <div>
                <h1>Background</h1>
                <div className="img-bgc">

                </div>
                <div className="color-bgc">

                </div>
            </div>
        </section>
    )
}