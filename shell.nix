{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_latest

    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
