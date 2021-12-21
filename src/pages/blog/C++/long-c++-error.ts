export const longCPPError = `main.cpp: In function ‘int main()’:
main.cpp:14:28: error: use of deleted function ‘SomeClass<SomeOtherClass>::SomeClass()’
   14 |  SomeClass<SomeOtherClass> instance;
      |                            ^~~~~~~~
main.cpp:4:7: note: ‘SomeClass<SomeOtherClass>::SomeClass()’ is implicitly deleted because the default definition would be ill-formed:
    4 | class SomeClass
      |       ^~~~~~~~~
main.cpp:4:7: error: use of deleted function ‘std::unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>::unordered_map() [with _Key = SomeOtherClass; _Tp = SomeOtherClass; _Hash = std::hash<SomeOtherClass>; _Pred = std::equal_to<SomeOtherClass>; _Alloc = std::allocator<std::pair<const SomeOtherClass, SomeOtherClass> >]’
In file included from /usr/include/c++/9/unordered_map:47,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/unordered_map.h:141:7: note: ‘std::unordered_map<_Key, _Tp, _Hash, _Pred, _Alloc>::unordered_map() [with _Key = SomeOtherClass; _Tp = SomeOtherClass; _Hash = std::hash<SomeOtherClass>; _Pred = std::equal_to<SomeOtherClass>; _Alloc = std::allocator<std::pair<const SomeOtherClass, SomeOtherClass> >]’ is implicitly deleted because the default definition would be ill-formed:
  141 |       unordered_map() = default;
      |       ^~~~~~~~~~~~~
/usr/include/c++/9/bits/unordered_map.h:141:7: error: use of deleted function ‘std::_Hashtable<_Key, _Value, _Alloc, _ExtractKey, _Equal, _H1, _H2, _Hash, _RehashPolicy, _Traits>::_Hashtable() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _Alloc = std::allocator<std::pair<const SomeOtherClass, SomeOtherClass> >; _ExtractKey = std::__detail::_Select1st; _Equal = std::equal_to<SomeOtherClass>; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing; _Hash = std::__detail::_Default_ranged_hash; _RehashPolicy = std::__detail::_Prime_rehash_policy; _Traits = std::__detail::_Hashtable_traits<true, false, true>]’
In file included from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable.h:414:7: note: ‘std::_Hashtable<_Key, _Value, _Alloc, _ExtractKey, _Equal, _H1, _H2, _Hash, _RehashPolicy, _Traits>::_Hashtable() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _Alloc = std::allocator<std::pair<const SomeOtherClass, SomeOtherClass> >; _ExtractKey = std::__detail::_Select1st; _Equal = std::equal_to<SomeOtherClass>; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing; _Hash = std::__detail::_Default_ranged_hash; _RehashPolicy = std::__detail::_Prime_rehash_policy; _Traits = std::__detail::_Hashtable_traits<true, false, true>]’ is implicitly deleted because the default definition would be ill-formed:
  414 |       _Hashtable() = default;
      |       ^~~~~~~~~~
/usr/include/c++/9/bits/hashtable.h:414:7: error: use of deleted function ‘std::__detail::_Hashtable_base<_Key, _Value, _ExtractKey, _Equal, _H1, _H2, _Hash, _Traits>::_Hashtable_base() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _ExtractKey = std::__detail::_Select1st; _Equal = std::equal_to<SomeOtherClass>; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing; _Hash = std::__detail::_Default_ranged_hash; _Traits = std::__detail::_Hashtable_traits<true, false, true>]’
In file included from /usr/include/c++/9/bits/hashtable.h:35,
                 from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable_policy.h:1822:5: note: ‘std::__detail::_Hashtable_base<_Key, _Value, _ExtractKey, _Equal, _H1, _H2, _Hash, _Traits>::_Hashtable_base() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _ExtractKey = std::__detail::_Select1st; _Equal = std::equal_to<SomeOtherClass>; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing; _Hash = std::__detail::_Default_ranged_hash; _Traits = std::__detail::_Hashtable_traits<true, false, true>]’ is implicitly deleted because the default definition would be ill-formed:
 1822 |     _Hashtable_base() = default;
      |     ^~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1822:5: error: use of deleted function ‘std::__detail::_Hash_code_base<_Key, _Value, _ExtractKey, _H1, _H2, std::__detail::_Default_ranged_hash, true>::_Hash_code_base() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _ExtractKey = std::__detail::_Select1st; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing]’
/usr/include/c++/9/bits/hashtable_policy.h:1373:7: note: ‘std::__detail::_Hash_code_base<_Key, _Value, _ExtractKey, _H1, _H2, std::__detail::_Default_ranged_hash, true>::_Hash_code_base() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _ExtractKey = std::__detail::_Select1st; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing]’ is implicitly deleted because the default definition would be ill-formed:
 1373 |       _Hash_code_base() = default;
      |       ^~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1373:7: error: use of deleted function ‘std::__detail::_Hashtable_ebo_helper<_Nm, _Tp, true>::_Hashtable_ebo_helper() [with int _Nm = 1; _Tp = std::hash<SomeOtherClass>]’
/usr/include/c++/9/bits/hashtable_policy.h:1096:7: note: ‘std::__detail::_Hashtable_ebo_helper<_Nm, _Tp, true>::_Hashtable_ebo_helper() [with int _Nm = 1; _Tp = std::hash<SomeOtherClass>]’ is implicitly deleted because the default definition would be ill-formed:
 1096 |       _Hashtable_ebo_helper() = default;
      |       ^~~~~~~~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1096:7: error: use of deleted function ‘std::hash<SomeOtherClass>::hash()’
In file included from /usr/include/c++/9/bits/basic_string.h:6719,
                 from /usr/include/c++/9/string:55,
                 from /usr/include/c++/9/bits/locale_classes.h:40,
                 from /usr/include/c++/9/bits/ios_base.h:41,
                 from /usr/include/c++/9/ios:42,
                 from /usr/include/c++/9/istream:38,
                 from /usr/include/c++/9/sstream:38,
                 from /usr/include/c++/9/complex:45,
                 from /usr/include/c++/9/ccomplex:39,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:54,
                 from main.cpp:1:
/usr/include/c++/9/bits/functional_hash.h:101:12: note: ‘std::hash<SomeOtherClass>::hash()’ is implicitly deleted because the default definition would be ill-formed:
  101 |     struct hash : __hash_enum<_Tp>
      |            ^~~~
/usr/include/c++/9/bits/functional_hash.h:101:12: error: no matching function for call to ‘std::__hash_enum<SomeOtherClass, false>::__hash_enum()’
/usr/include/c++/9/bits/functional_hash.h:82:7: note: candidate: ‘std::__hash_enum<_Tp, <anonymous> >::__hash_enum(std::__hash_enum<_Tp, <anonymous> >&&) [with _Tp = SomeOtherClass; bool <anonymous> = false]’
   82 |       __hash_enum(__hash_enum&&);
      |       ^~~~~~~~~~~
/usr/include/c++/9/bits/functional_hash.h:82:7: note:   candidate expects 1 argument, 0 provided
/usr/include/c++/9/bits/functional_hash.h:101:12: error: ‘std::__hash_enum<_Tp, <anonymous> >::~__hash_enum() [with _Tp = SomeOtherClass; bool <anonymous> = false]’ is private within this context
  101 |     struct hash : __hash_enum<_Tp>
      |            ^~~~
/usr/include/c++/9/bits/functional_hash.h:83:7: note: declared private here
   83 |       ~__hash_enum();
      |       ^
In file included from /usr/include/c++/9/bits/hashtable.h:35,
                 from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable_policy.h:1096:7: error: use of deleted function ‘std::hash<SomeOtherClass>::~hash()’
 1096 |       _Hashtable_ebo_helper() = default;
      |       ^~~~~~~~~~~~~~~~~~~~~
In file included from /usr/include/c++/9/bits/basic_string.h:6719,
                 from /usr/include/c++/9/string:55,
                 from /usr/include/c++/9/bits/locale_classes.h:40,
                 from /usr/include/c++/9/bits/ios_base.h:41,
                 from /usr/include/c++/9/ios:42,
                 from /usr/include/c++/9/istream:38,
                 from /usr/include/c++/9/sstream:38,
                 from /usr/include/c++/9/complex:45,
                 from /usr/include/c++/9/ccomplex:39,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:54,
                 from main.cpp:1:
/usr/include/c++/9/bits/functional_hash.h:101:12: note: ‘std::hash<SomeOtherClass>::~hash()’ is implicitly deleted because the default definition would be ill-formed:
  101 |     struct hash : __hash_enum<_Tp>
      |            ^~~~
/usr/include/c++/9/bits/functional_hash.h:101:12: error: ‘std::__hash_enum<_Tp, <anonymous> >::~__hash_enum() [with _Tp = SomeOtherClass; bool <anonymous> = false]’ is private within this context
/usr/include/c++/9/bits/functional_hash.h:83:7: note: declared private here
   83 |       ~__hash_enum();
      |       ^
In file included from /usr/include/c++/9/bits/hashtable.h:35,
                 from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable_policy.h:1373:7: error: use of deleted function ‘std::__detail::_Hashtable_ebo_helper<1, std::hash<SomeOtherClass>, true>::~_Hashtable_ebo_helper()’
 1373 |       _Hash_code_base() = default;
      |       ^~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1093:12: note: ‘std::__detail::_Hashtable_ebo_helper<1, std::hash<SomeOtherClass>, true>::~_Hashtable_ebo_helper()’ is implicitly deleted because the default definition would be ill-formed:
 1093 |     struct _Hashtable_ebo_helper<_Nm, _Tp, true>
      |            ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1093:12: error: use of deleted function ‘std::hash<SomeOtherClass>::~hash()’
/usr/include/c++/9/bits/hashtable_policy.h:1822:5: error: use of deleted function ‘std::__detail::_Hash_code_base<SomeOtherClass, std::pair<const SomeOtherClass, SomeOtherClass>, std::__detail::_Select1st, std::hash<SomeOtherClass>, std::__detail::_Mod_range_hashing, std::__detail::_Default_ranged_hash, true>::~_Hash_code_base()’
 1822 |     _Hashtable_base() = default;
      |     ^~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1346:12: note: ‘std::__detail::_Hash_code_base<SomeOtherClass, std::pair<const SomeOtherClass, SomeOtherClass>, std::__detail::_Select1st, std::hash<SomeOtherClass>, std::__detail::_Mod_range_hashing, std::__detail::_Default_ranged_hash, true>::~_Hash_code_base()’ is implicitly deleted because the default definition would be ill-formed:
 1346 |     struct _Hash_code_base<_Key, _Value, _ExtractKey, _H1, _H2,
      |            ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 1347 |       _Default_ranged_hash, true>
      |       ~~~~~~~~~~~~~~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1346:12: error: use of deleted function ‘std::__detail::_Hashtable_ebo_helper<1, std::hash<SomeOtherClass>, true>::~_Hashtable_ebo_helper()’
In file included from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable.h:414:7: error: use of deleted function ‘std::__detail::_Hashtable_base<SomeOtherClass, std::pair<const SomeOtherClass, SomeOtherClass>, std::__detail::_Select1st, std::equal_to<SomeOtherClass>, std::hash<SomeOtherClass>, std::__detail::_Mod_range_hashing, std::__detail::_Default_ranged_hash, std::__detail::_Hashtable_traits<true, false, true> >::~_Hashtable_base()’
  414 |       _Hashtable() = default;
      |       ^~~~~~~~~~
In file included from /usr/include/c++/9/bits/hashtable.h:35,
                 from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable_policy.h:1770:10: note: ‘std::__detail::_Hashtable_base<SomeOtherClass, std::pair<const SomeOtherClass, SomeOtherClass>, std::__detail::_Select1st, std::equal_to<SomeOtherClass>, std::hash<SomeOtherClass>, std::__detail::_Mod_range_hashing, std::__detail::_Default_ranged_hash, std::__detail::_Hashtable_traits<true, false, true> >::~_Hashtable_base()’ is implicitly deleted because the default definition would be ill-formed:
 1770 |   struct _Hashtable_base
      |          ^~~~~~~~~~~~~~~
/usr/include/c++/9/bits/hashtable_policy.h:1770:10: error: use of deleted function ‘std::__detail::_Hash_code_base<SomeOtherClass, std::pair<const SomeOtherClass, SomeOtherClass>, std::__detail::_Select1st, std::hash<SomeOtherClass>, std::__detail::_Mod_range_hashing, std::__detail::_Default_ranged_hash, true>::~_Hash_code_base()’
In file included from /usr/include/c++/9/unordered_map:46,
                 from /usr/include/x86_64-linux-gnu/c++/9/bits/stdc++.h:117,
                 from main.cpp:1:
/usr/include/c++/9/bits/hashtable.h: In instantiation of ‘std::_Hashtable<_Key, _Value, _Alloc, _ExtractKey, _Equal, _H1, _H2, _Hash, _RehashPolicy, _Traits>::~_Hashtable() [with _Key = SomeOtherClass; _Value = std::pair<const SomeOtherClass, SomeOtherClass>; _Alloc = std::allocator<std::pair<const SomeOtherClass, SomeOtherClass> >; _ExtractKey = std::__detail::_Select1st; _Equal = std::equal_to<SomeOtherClass>; _H1 = std::hash<SomeOtherClass>; _H2 = std::__detail::_Mod_range_hashing; _Hash = std::__detail::_Default_ranged_hash; _RehashPolicy = std::__detail::_Prime_rehash_policy; _Traits = std::__detail::_Hashtable_traits<true, false, true>]’:
/usr/include/c++/9/bits/unordered_map.h:102:11:   required from here
/usr/include/c++/9/bits/hashtable.h:1354:5: error: use of deleted function ‘std::__detail::_Hashtable_base<SomeOtherClass, std::pair<const SomeOtherClass, SomeOtherClass>, std::__detail::_Select1st, std::equal_to<SomeOtherClass>, std::hash<SomeOtherClass>, std::__detail::_Mod_range_hashing, std::__detail::_Default_ranged_hash, std::__detail::_Hashtable_traits<true, false, true> >::~_Hashtable_base()’
 1354 |     }
      |     ^
`