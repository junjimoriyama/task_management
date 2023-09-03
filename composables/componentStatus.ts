

// composablesで全体共通の状態を持たせるにはuseStateを使用する。
// また状態を変化させたい場合はメソッドを定義しないといけない。それぞれexportさせる。
// 'isShowAddModal'はkey(ID)。ない場合はファイル名と書かれている行番号がIDとなる。
export const isShowAddModal = useState('isShowAddModal', () => false)
// 引数は複数でもOK
export const changeShowAddModal = (status: boolean) => {
	isShowAddModal.value = status
}

	// 上記のコードでは、useState という関数を使用して、状態変数 isShowAddModal を作成しています。これは、Nuxt3における状態管理のための新しい方法です。

	// useState: この関数は状態を作成・管理するためのものです。Reactの useState フックに似ていますが、Nuxt3のコンテクストで使用されます。
	// 'isShowAddModal': これは状態の名前を示しています。この名前は一意である必要があります。
	// () => false: これは状態の初期値を設定する関数です。この例では、isShowAddModal の初期値は false としています。

// 	この関数は、引数 status（ブール型）を受け取り、isShowAddModal の値を更新します。
// isShowAddModal.value: useState によって作成された状態は、.value プロパティを使用してアクセス・更新することができます。このコードでは、isShowAddModal の値を受け取った status で更新しています。
// このように、Nuxt3では簡単な状態管理が useState を使って行えます。これは、小規模なアプリケーションやコンポーネント固有の状態管理に適しています。大規模なアプリケーションで複雑な状態管理が必要な場合は、Vuexなどの状態管理ライブラリを検討することもできます。





