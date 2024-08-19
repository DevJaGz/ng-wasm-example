// pub fn add(left: u64, right: u64) -> u64 {
//     left + right
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }
use wasm_bindgen::prelude::*;

pub fn factorial(num: u128) -> u128 {
    match num {
        0 => 1,
        1 => 1,
        _ => factorial(num - 1) * num,
    }
}


#[wasm_bindgen]
pub fn get_factorial(num: u8) -> String {
    let mut f: u128 = 0;
    for _ in 0..10_000_000 {
      f = factorial(num as u128); 
    }
    f.to_string()
}