/**
 * @author: laoona
 * @date:  2024-08-20
 * @time: 19:17
 * @contact: laoona.com
 * @description: #
 */

import { Transforms, Range } from 'slate'
import { IDomEditor, DomEditor, t, ISelectMenu, IOption } from '@wangeditor/core'
import { TableElement } from '../custom-types'

class TableColumnWidth implements ISelectMenu {
  readonly title = '表格列宽'
  readonly tag = 'select'
  readonly width = 90

  getOptions(editor: IDomEditor): IOption[] {
    // 生成 options
    const options: IOption[] = [
      {
        text: '默认列宽',
        value: '', // this.getValue(editor) 未找到结果时，会返回 '' ，正好对应到这里
      },
      {
        text: '270',
        value: '270',
      },
      {
        text: '480',
        value: '480',
      },
    ]

    // 设置 selected
    const curValue = this.getValue(editor)

    options.forEach(opt => {
      if (opt.value === curValue) {
        opt.selected = true
      } else {
        delete opt.selected
      }
    })

    return options
  }
  // 是否已设置 宽度自适应
  getValue(editor: IDomEditor): string {
    const tableNode = DomEditor.getSelectedNodeByType(editor, 'table')
    if (tableNode == null) return ''

    return ((tableNode as TableElement).tableColumnWidth || '') as string
  }

  isActive(editor: IDomEditor): boolean {
    return false
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

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return

    const props: Partial<TableElement> = {
      tableColumnWidth: (value || '') as TableElement['tableColumnWidth'],
    }
    Transforms.setNodes(editor, props, { mode: 'highest' })
  }
}

export default TableColumnWidth
