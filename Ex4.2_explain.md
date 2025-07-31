4.2 Search & Filter bar

Add a search & filter bar in top of Home page. Have 2 part:
- Search box: Input text. Search name of product. Can search for part of name product. Case insensitive. Search in every times on change/type.
Example: bag => "Baggie"/ "Red bag"
- Filter box: 
  + Category: Select box ( jewelery/ men's clothing/ women's clothing/electronics)
  + Price: Range number inbox 1 - 100+$
  + Button "clear" => clear all filter
  + Button "Filter"
=> Enter filter and press search button, new result is show.

Requirement: 
- Search and filter can apply in the same time
- Count how many result after search/filter "3 results" show on page
- Select box category is miltiple select
- Range number input from 1 to 100. Default is 1 -> 100+ it means show all. If input 50 -> 100 it means >=50$ (Tips: use framework component).
- When reload page the search and filter still keep data. (Tips: save into URL).

