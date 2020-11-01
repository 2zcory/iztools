# iz-show

> 3 mode sẵn có: slide, tablist và toggle

## Input

- `izShow(obj)`

- `obj` là một object đại diện cho component gồm có:

  - `root` (default: _document_) phần tử root (duy nhất trong document)
  - `button` (required: _true_): các phần tử button (chọn nhiều)
  - `activeButton` (default: _false_): tên class đánh dấu button active
  - `content` (required: _true_): tên nội dung được hiển thị theo button active (chọn nhiều)
  - `showContent` (default: _'show'_) tên class đánh dấu content được show
  - `mode` (must choose): 'slide' | 'tablist' | 'toggle'
  - `hideButtonOnDisable` (default: _block_, mode: _slide_)

- Tại component HTML, các attribute sau vào html elements:
  - `data-show`: chứa value là unique để đánh dấu hiển thị (có thể đánh theo số thứ tự để áp đặt thứ tự hiển thị)
  - content master sẽ được gán thuộc tính `iz-default`
