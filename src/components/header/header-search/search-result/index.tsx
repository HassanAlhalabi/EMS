
interface ISearchResult {
    id: string,
    image: string,
    title: string,
}

const SearchResult = ({
    id,
    image,
    title,
}: ISearchResult) => {
  return (
    <a className="dropdown-item px-card py-2" href={id}>
        <div className="d-flex align-items-center">
            <div className="avatar avatar-l status-online me-2">
                <img className="rounded-circle" src={image} alt="" />
            </div>
            <div className="flex-1">
            <h6 className="mb-0 title">{title}</h6>
            {/* <p className="fs--2 mb-0 d-flex">Technext Limited</p> */}
            </div>
        </div>
    </a>
  )
}

export default SearchResult
