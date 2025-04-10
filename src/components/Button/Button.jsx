import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = React.forwardRef(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      isLoading && 'button--loading',
      className
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className='button__spinner'></span>}
        {!isLoading && leftIcon && (
          <span className='button__icon button__icon--left'>{leftIcon}</span>
        )}
        <span className='button__text'>{children}</span>
        {!isLoading && rightIcon && (
          <span className='button__icon button__icon--right'>{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  isLoading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
