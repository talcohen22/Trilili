import { utilService } from "../../services/util.service";
import { BackBtnSvg } from "../svg/ImgSvg";

export function ChangeBackground({ onOpenMenuCmp }) {

    return (
        <section className="change-background flex justify-center">

            <div onClick={(ev) => onOpenMenuCmp(ev, 'Photos by Unsplash')}>
                <img src={utilService.getAssetSrc('photos.jpg')} alt="user" />
                <p>Photos</p>
            </div>

            <div onClick={(ev) => onOpenMenuCmp(ev, 'Colors')}>
                <img src={utilService.getAssetSrc('colors.jpg')} alt="user" />
                <p>Colors</p>
            </div >

            <div className="back-btn flex align-center justify-center" onClick={(ev) => onOpenMenuCmp(ev, 'Menu')}>
                <BackBtnSvg />
            </div>

        </section>
    )
}