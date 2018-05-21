/**
 *  easyH5
 * Created by 王佳欣 on 2017/5/27.
 */
import * as easyH5Types from '../../constants/types/easyH5';
export default {
    [easyH5Types.EASYH5_ADD_FILE] (state, file) {
        state.files.push(file);
    },
    [easyH5Types.EASYH5_REMOVE_FILE] (state, index) {
        state.files.splice(index, 1);
    },
    [easyH5Types.EASYH5_MOVE_UP] (state, index) {
        let temp = state.files[index];
        state.files.splice(index, 1, state.files[index - 1]);
        state.files.splice(index - 1, 1, temp);
    },
    [easyH5Types.EASYH5_MOVE_DOWN] (state, index) {
        let temp = state.files[index];
        state.files.splice(index, 1, state.files[index + 1]);
        state.files.splice(index + 1, 1, temp);
        console.log(state.files);
    }
};
