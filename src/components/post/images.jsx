import propTypes from 'prop-types'

export default function Images(src, caption) {
    return (
        <img src={src} alt={caption} />
    )
}

Images.propTypes = {
    src: propTypes.string.isRequired,
    caption: propTypes.string.isRequired
}