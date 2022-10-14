import { sha256 } from '@cosmjs/crypto'
import { fromBase64, fromBech32, fromHex, toHex } from '@cosmjs/encoding'
import RIPEMD160 from 'ripemd160'

export function consensusPubkeyToHexAddress(consensusPubkey): string {
	let raw = null
	if (typeof consensusPubkey === 'object') {
		if (consensusPubkey.type === 'tendermint/PubKeySecp256k1') {
			raw = new RIPEMD160()
				.update(Buffer.from(sha256(fromBase64(consensusPubkey.value))))
				.digest('hex')
				.toUpperCase()
			return raw
		}
		raw = sha256(fromBase64(consensusPubkey.value))
	} else {
		raw = sha256(fromHex(toHex(fromBech32(consensusPubkey).data).toUpperCase().replace('1624DE6420', '')))
	}
	const address = toHex(raw).slice(0, 40).toUpperCase()
	return address
}

export function getStakingValidatorByHex(hex): Proposer | string {
	const locals = localStorage.getItem(`validators`)
	if (locals && locals !== 'undefined') {
		const val = JSON.parse(locals).find(
			x =>
				consensusPubkeyToHexAddress({
					type: 'tendermint/PubKeyEd25519"',
					value: x.tendermintPubkey
				}) === hex
		)
		if (val) {
			return val as Proposer
		}
	}
	// return abbr(hex)
	return hex
}

export function abbr(string, length = 6, suffix = '...'): string {
	if (string && string.length > length) {
		return `${string.substring(0, length)}${suffix}`
	}
	return string
}
