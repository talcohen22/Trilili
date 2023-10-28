import { BackBtnSvg } from "../svg/ImgSvg";

export function ChangePhotoBackground({onOpenMenuCmp}) {

    const photos = [0,50,100,150,200,250,300];

    return (

        <section className="change-photo-background">
            
            <div className="photos-bgc flex justify-center">
                {photos.map((photo, index) => (
                    <img
                        key={index}
                        onClick={() => onUpdateBgc(photos[index])}
                        src={`https://source.unsplash.com/random/${300+photo}×${300+photo}`}
                    ></img>
                ))}
            </div>

            <div className="back-btn flex align-center justify-center" onClick={() => onOpenMenuCmp('Change background')}>
                <BackBtnSvg />
            </div>

        </section>
    )
}