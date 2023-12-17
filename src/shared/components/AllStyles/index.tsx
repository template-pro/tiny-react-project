import { css } from '@emotion/react'
import cx from 'clsx'
import styles from './legacy.module.less'
import './normal.css'

function AllStyles() {
  return (
    <div
      className={cx('all-styles-container', styles.foo)}
      css={css`
        background-color: green;
        text-align: center;
      `}
    >
      Styles
    </div>
  )
}

export default AllStyles
