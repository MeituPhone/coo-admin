/**
 * 管理员相关 action
 * Created by 王佳欣 on 2017/5/27.
 */
import easyH5Api from '../../api/easyH5';
import * as easyH5Type from '../../constants/types/easyH5';

export default {
    create ({ commit }, data) {
        return easyH5Api.create(data);
    },
    remove ({ commit }, id) {
        return easyH5Api.remove(id);
    },
    update ({ commit }, { condition, data }) {
        return easyH5Api.update({condition, data});
    },
    fetch ({ commit }, {page, per_page}) {
        return easyH5Api.fetch({page, per_page});
    },
    addFile ({ commit }, file) {
        commit(easyH5Type.EASYH5_ADD_FILE, file);
    },
    removeFile ({ commit }, index) {
        commit(easyH5Type.EASYH5_REMOVE_FILE, index);
    },
    moveUp ({ commit }, index) {
        commit(easyH5Type.EASYH5_MOVE_UP, index);
    },
    moveDown ({ commit }, index) {
        commit(easyH5Type.EASYH5_MOVE_DOWN, index);
    }
};
