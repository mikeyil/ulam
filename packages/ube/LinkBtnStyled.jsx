import './link-btn-styled.css'

export default function LinkBtnStyled({ href, onClick, className, children, ...rest }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}
