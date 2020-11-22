const createState = (props) => {
    let value = props
    const state = () => value;
    const setState = (callback) => {
        let value = callback
    }
    return [state(), setState]
}