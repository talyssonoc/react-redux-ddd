declare module 'keymirror-nested' {

  declare type $MirrorKey = <K>(k:K) => K;

  declare type KeyMirrorNested = <O>(obj: O, glue: string, prefix: string) => $ObjMap<O, $MirrorKey>;

  declare export default KeyMirrorNested;
}
