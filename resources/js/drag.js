import { add_to_capacity, sub_from_capacity, check_capacity_per_type_per_col } from './fill_table.js';

let elements = [];
function refreshOpening(deleted) {
    // pos[0] - target table index
    // pos[1] - target row index
    // pos[2] - target cell (column) index
    // pos[3] - source table index
    // pos[4] - source row index
    // pos[5] - source cell (column) index
    var change = window.REDIPS.drag.getPosition();
    var element = window.REDIPS.drag.obj;
    let current_cell_index = change[2] - 1;
    let source_cell_index = change[5] - 1;
    let element_type_id = element.id.split('c')[0].split('e')[1];
    console.log();
    if (deleted) {
        add_to_capacity(element_type_id, 1, false, source_cell_index);
    }
    else {
        if (check_capacity_per_type_per_col(element_type_id, current_cell_index) == 0) {
            alert("Not Enough Capacity");
            element.remove();
            if (elements.includes(element)) {

                add_to_capacity(element_type_id, 1, false, source_cell_index);
            }
        }
        else {
            if (elements.includes(element)) {

                add_to_capacity(element_type_id, 1, false, source_cell_index);
                sub_from_capacity(element_type_id, 1, false, current_cell_index);
            }
            else {

                elements.push(element);
                sub_from_capacity(element_type_id, 1, false, current_cell_index);

            }
        }

    }

}

export { refreshOpening };
