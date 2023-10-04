import { FilterSvg, StarSvg } from "../svg/ImgSvg"

export function BoardFilter() {

    return (
        <div className=" board-filter">
            <div className="flex justify-space-b">
                <div className="flex">
                    <h1>board name</h1>

                    <div className="icon">
                        <StarSvg />
                    </div>
                </div>
               
                    <div className="icon">
                <FilterSvg/>
                    </div>
                
            </div>
        </div>
    )
}