/**
 * @description head menu
 * @author wangfupeng
 */

import Editor from '../../src/editor'
import createEditor from '../fns/create-editor'
import mockCmdFn from '../fns/command-mock'
import Head from '../../src/menus/head/index'
import { getMenuInstance } from '../fns/menus'

let editor: Editor
let headMenu: Head

test('head 菜单：dropList', () => {
    editor = createEditor(document, 'div1') // 赋值给全局变量
    headMenu = getMenuInstance(editor, Head) as Head // 赋值给全局变量
    expect(headMenu.dropList).not.toBeNull()
    headMenu.dropList.show()
    expect(headMenu.dropList._show).toBe(true)
    headMenu.dropList.hide()
    expect(headMenu.dropList._show).toBe(false)
})

test('head 菜单：设置标题', () => {
    mockCmdFn(document)
    const cmdVal = '<h1>'
    headMenu.command(cmdVal)
    expect(document.execCommand).toBeCalledWith('formatBlock', false, cmdVal)
})