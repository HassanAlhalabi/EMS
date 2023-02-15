
const NotificationMenu = () => {
  return (
      <div className="card card-notification shadow-none" >
        <div className="card-header">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <h6 className="card-header-title mb-0">Notifications</h6>
            </div>
            <div className="col-auto ps-0 ps-sm-3"><a className="card-link fw-normal" href="#">Mark all as read</a></div>
          </div>
        </div>
        <div style={{maxHeight: "19rem", overflowY:'auto'}}>
          <div className="list-group list-group-flush fw-normal fs--1">
            <div className="list-group-title border-bottom">NEW</div>
            <div className="list-group-item">
              <a className="notification notification-flush notification-unread" href="#!">
                <div className="notification-avatar">
                  <div className="avatar avatar-2xl me-3">
                    <img className="rounded-circle" src="assets/img/team/1-thumb.png" alt="" />
                  </div>
                </div>
                <div className="notification-body">
                  <p className="mb-1"><strong>Emma Watson</strong> replied to your comment : "Hello world 😍"</p>
                  <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">💬</span>Just now</span>
                </div>
              </a>
            </div>
            <div className="list-group-title border-bottom">EARLIER</div>
            <div className="list-group-item">
              <a className="notification notification-flush" href="#!">
                <div className="notification-avatar">
                  <div className="avatar avatar-2xl me-3">
                    <img className="rounded-circle" src="assets/img/icons/weather-sm.jpg" alt="" />
                  </div>
                </div>
                <div className="notification-body">
                  <p className="mb-1">The forecast today shows a low of 20℃ in California. See today's weather.</p>
                  <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">🌤️</span>1d</span>
                </div>
              </a>
            </div>
            <div className="list-group-item">
              <a className="border-bottom-0 notification-unread  notification notification-flush" href="#!">
                <div className="notification-avatar">
                  <div className="avatar avatar-xl me-3">
                    <img className="rounded-circle" src="assets/img/logos/oxford.png" alt="" />
                  </div>
                </div>
                <div className="notification-body">
                  <p className="mb-1"><strong>University of Oxford</strong> created an event : "Causal Inference Hilary 2019"</p>
                  <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">✌️</span>1w</span>
                </div>
              </a>
            </div>
            <div className="list-group-item">
              <a className="border-bottom-0 notification notification-flush" href="#!">
                <div className="notification-avatar">
                  <div className="avatar avatar-xl me-3">
                    <img className="rounded-circle" src="assets/img/team/10.jpg" alt="" />
                  </div>
                </div>
                <div className="notification-body">
                  <p className="mb-1"><strong>James Cameron</strong> invited to join the group: United Nations International Children's Fund</p>
                  <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">🙋‍</span>2d</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="card-footer text-center border-top"><a className="card-link d-block" href="app/social/notifications.html">View all</a></div>
      </div>
  )
}

export default NotificationMenu
