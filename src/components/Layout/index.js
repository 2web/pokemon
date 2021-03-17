import cn from 'classnames';
import s from './style.module.css';

const Layout = ({title, urlBg, colorBg, colorTitle, children}) => {
  const sectionStyle = {
    backgroundColor : colorBg,
    backgroundImage : `url(${urlBg})`
  }
  const titleStyle = {
    color: colorTitle
  }
  return (
    <>
        <section className={s.root} style={sectionStyle} >
            <div className={s.wrapper}>
                <article>
                    <div className={s.title} style={titleStyle}>
                        <h3>{title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={cn(s.desc, s.full)}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    </>
  );
}

export default Layout;