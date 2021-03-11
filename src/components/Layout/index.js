import s from './style.module.css';

const Layout = (props) => {
  const sectionStyle = {
    backgroundColor: props.colorBg,
    backgroundImage : "url("+props.urlBg+")"
  }
  return (
    <section style={sectionStyle} className={s.root} >
        <div className={s.wrapper}>
            <article>
                <div className="title">
                    <h3>{props.title}</h3>
                    <span className={s.separator}></span>
                </div>
                <div className={s.desc}>
                    <p>{props.desc}</p>
                </div>
            </article>
        </div>
    </section>
  );
}

export default Layout;