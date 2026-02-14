
import useStore from '../store/useStore'
const Nieto3 = () => {

const {incrementar,decrementar} = useStore()

   

    return (
        <div>
            <br />

            <button onClick={incrementar}>+</button>
            <button onClick={decrementar}>-</button>
        </div>
    )
}

export default Nieto3