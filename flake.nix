{
  description = "A Nix-flake-based Node.js development environment";

  inputs.nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1";

  outputs =
    inputs:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forEachSupportedSystem =
        f:
        inputs.nixpkgs.lib.genAttrs supportedSystems (
          system:
          f {
            pkgs = import inputs.nixpkgs {
              inherit system;
              overlays = [ inputs.self.overlays.default ];
            };
            system = system;
          }
        );
    in
    {
      overlays.default = final: prev: rec {
        nodejs = prev.nodejs_24;
        yarn = (prev.yarn.override { inherit nodejs; });
      };

      packages = forEachSupportedSystem (
        { pkgs, system }:
        {
          devEnv = pkgs.buildEnv {
            name = "pdf-tools-js-env";
            paths = [
              pkgs.nodejs
              pkgs.nixfmt-rfc-style
            ];
          };
        }
      );

      devShells = forEachSupportedSystem (
        { pkgs, system }:
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              inputs.self.packages.${system}.devEnv
            ];
          };
        }
      );
    };
}
