/**
 * @author: laoona
 * @date:  2024-08-20
 * @time: 19:17
 * @contact: laoona.com
 * @description: #
 */

import { Transforms, Range } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor, t } from '@wangeditor/core'
// import { FULL_WIDTH_SVG } from '../../constants/svg'
import { TableElement } from '../custom-types'

class TableColumn270 implements IButtonMenu {
  readonly title = '270'
  readonly tag = 'button'

  // 是否已设置 宽度自适应
  // @ts-ignore
  getValue(editor: IDomEditor): boolean {
    const tableNode = DomEditor.getSelectedNodeByType(editor, 'table')
    console.log(tableNode, '111')
    if (tableNode == null) return false

    return (tableNode as TableElement).tableColumnWidth === '270'
  }

  isActive(editor: IDomEditor): boolean {
    return this.getValue(editor)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (!Range.isCollapsed(selection)) return true

    const tableNode = DomEditor.getSelectedNodeByType(editor, 'table')
    if (tableNode == null) {
      // 选区未处于 table node ，则禁用
      return true
    }
    return false
  }

  // @ts-ignore
  exec(editor: IDomEditor, value: TableElement['tableColumnWidth']) {
    if (this.isDisabled(editor)) return

    const props: Partial<TableElement> = {
      tableColumnWidth: value ? undefined : '270',
    }
    Transforms.setNodes(editor, props, { mode: 'highest' })
  }
}

export default TableColumn270
